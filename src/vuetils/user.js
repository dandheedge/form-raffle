import { supabase } from '@/lib/supabase'
async function addUser(user) {
  try {
    const { data } = await supabase.from('User').insert([user]).select()
    return data
  } catch (error) {
    console.error('Error insert data', error)
    return error
  }
}
export { addUser }
