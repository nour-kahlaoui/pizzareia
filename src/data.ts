export type Shape = 'disc' | 'ring' | 'leaf' | 'chunk' | 'strip' | 'mush' | 'flake' | 'crumb' | 'shred'
export type Cat = 'sauce' | 'cheese' | 'meat' | 'veg' | 'extra'
export interface Ingredient { id: string; name: string; cat: Cat; price: number; shape: Shape; color: string; count: number }

export const CATS: { id: Cat; label: string }[] = [
  { id: 'sauce', label: 'Sauces' }, { id: 'cheese', label: 'Cheeses' },
  { id: 'meat', label: 'Meats' }, { id: 'veg', label: 'Vegetables' }, { id: 'extra', label: 'Extras' },
]

export const INGREDIENTS: Ingredient[] = [
  { id: 'tomato-sauce', name: 'Classic tomato', cat: 'sauce', price: 0, shape: 'disc', color: '#c43b22', count: 1 },
  { id: 'garlic-sauce', name: 'White garlic', cat: 'sauce', price: 1, shape: 'disc', color: '#f3ead2', count: 1 },
  { id: 'bbq-sauce', name: 'BBQ', cat: 'sauce', price: 1, shape: 'disc', color: '#6b2c14', count: 1 },
  { id: 'pesto-sauce', name: 'Pesto', cat: 'sauce', price: 1.5, shape: 'disc', color: '#6f9a3c', count: 1 },
  { id: 'mozzarella', name: 'Mozzarella', cat: 'cheese', price: 0, shape: 'shred', color: '#fff6dc', count: 1 },
  { id: 'parmesan', name: 'Parmesan', cat: 'cheese', price: 1.5, shape: 'shred', color: '#f4dd9a', count: 1 },
  { id: 'cheddar', name: 'Cheddar', cat: 'cheese', price: 1.5, shape: 'shred', color: '#f0a63a', count: 1 },
  { id: 'burrata', name: 'Burrata', cat: 'cheese', price: 3, shape: 'shred', color: '#ffffff', count: 1 },
  { id: 'pepperoni', name: 'Pepperoni', cat: 'meat', price: 2.5, shape: 'disc', color: '#b3281e', count: 7 },
  { id: 'chicken', name: 'Chicken', cat: 'meat', price: 2.5, shape: 'chunk', color: '#e3b97a', count: 6 },
  { id: 'beef', name: 'Beef', cat: 'meat', price: 3, shape: 'crumb', color: '#6a3b24', count: 6 },
  { id: 'bacon', name: 'Bacon', cat: 'meat', price: 3, shape: 'strip', color: '#c4543c', count: 5 },
  { id: 'sausage', name: 'Sausage', cat: 'meat', price: 2.5, shape: 'disc', color: '#8a4a30', count: 6 },
  { id: 'mushroom', name: 'Mushrooms', cat: 'veg', price: 1.5, shape: 'mush', color: '#d9c4a3', count: 6 },
  { id: 'onion', name: 'Red onions', cat: 'veg', price: 1, shape: 'ring', color: '#b4528a', count: 7 },
  { id: 'pepper', name: 'Green peppers', cat: 'veg', price: 1, shape: 'ring', color: '#4f9a3a', count: 6 },
  { id: 'olive', name: 'Black olives', cat: 'veg', price: 1.5, shape: 'ring', color: '#2a2a2e', count: 8 },
  { id: 'tomato', name: 'Tomatoes', cat: 'veg', price: 1, shape: 'disc', color: '#e0472f', count: 6 },
  { id: 'jalapeno', name: 'Jalapeños', cat: 'veg', price: 1.5, shape: 'ring', color: '#7fae3a', count: 7 },
  { id: 'basil', name: 'Fresh basil', cat: 'veg', price: 0.5, shape: 'leaf', color: '#2f7a35', count: 5 },
  { id: 'chili', name: 'Chili flakes', cat: 'extra', price: 0.5, shape: 'flake', color: '#d4281c', count: 10 },
  { id: 'garlic', name: 'Garlic', cat: 'extra', price: 0.5, shape: 'flake', color: '#f1e6c4', count: 8 },
  { id: 'pineapple', name: 'Pineapple', cat: 'extra', price: 1.5, shape: 'chunk', color: '#f4c63a', count: 6 },
  { id: 'extra-cheese', name: 'Extra cheese', cat: 'extra', price: 2, shape: 'shred', color: '#fff0b8', count: 1 },
]

export const SIZES = [
  { id: 'S', label: 'Small', base: 9, scale: 0.78 },
  { id: 'M', label: 'Medium', base: 12, scale: 0.87 },
  { id: 'L', label: 'Large', base: 15, scale: 0.94 },
  { id: 'XL', label: 'Extra Large', base: 19, scale: 1 },
]
export const CRUSTS = [
  { id: 'classic', label: 'Classic', price: 0, rim: 6 },
  { id: 'thin', label: 'Thin', price: 0, rim: 4 },
  { id: 'stuffed', label: 'Cheese-stuffed', price: 3, rim: 9 },
  { id: 'whole', label: 'Whole wheat', price: 1.5, rim: 6 },
]
export const DELIVERY_FEE = 3
export const fmt = (n: number) => `${n.toFixed(2)} DT`
export const byId = (id: string) => INGREDIENTS.find(i => i.id === id)!