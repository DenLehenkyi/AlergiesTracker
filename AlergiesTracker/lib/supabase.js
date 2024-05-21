import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwaugzrmfavdnfylbgkx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3YXVnenJtZmF2ZG5meWxiZ2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzMDE1MDIsImV4cCI6MjAzMTg3NzUwMn0.FiIM9d126HOFYVhbSAmmR-sduHk6IchenG57HoWZ2YQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})