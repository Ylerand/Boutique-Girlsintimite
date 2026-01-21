 -- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin', 'manager')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. PRODUCTS
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  price integer not null, -- Stored in CLP (integers)
  sale_price integer,     -- Null if not on sale
  stock integer default 0 not null,
  category text not null, -- 'ropa', 'lenceria', 'accesorios', etc.
  images text[],          -- Array of image URLs
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table public.products enable row level security;

-- Policies for Products
create policy "Products are viewable by everyone." on public.products
  for select using (true);

create policy "Only admins can insert products." on public.products
  for insert with check (auth.uid() in (select id from public.profiles where role = 'admin'));

create policy "Only admins can update products." on public.products
  for update using (auth.uid() in (select id from public.profiles where role = 'admin'));


-- 3. ORDERS
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id), -- Nullable for Guest Checkout
  status text default 'pending_payment' check (status in ('pending_payment', 'paid', 'processing', 'shipped', 'cancelled', 'refunded')),
  total integer not null,
  shipping_address jsonb, -- { region, commune, street, number, details }
  contact_info jsonb,     -- { email, phone, name } (Crucial for guest checkout)
  payment_method text check (payment_method in ('transfer', 'cod')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table public.orders enable row level security;

-- Policies for Orders
create policy "Users can view their own orders." on public.orders
  for select using (auth.uid() = user_id);

create policy "Admins can view all orders." on public.orders
  for select using (auth.uid() in (select id from public.profiles where role in ('admin', 'manager')));

create policy "Anyone can create an order (Guest/Auth)." on public.orders
  for insert with check (true);


-- 4. ORDER ITEMS
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id),
  quantity integer default 1 not null,
  price integer not null, -- Price at the moment of purchase
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items." on public.order_items
  for select using (
    exists ( select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid() )
  );
  
create policy "Admins can view all order items." on public.order_items
   for select using (auth.uid() in (select id from public.profiles where role in ('admin', 'manager')));

create policy "Anyone can insert order items." on public.order_items
  for insert with check (true);
