import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('bj_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  const login = (phone, password) => {
    const users = JSON.parse(localStorage.getItem('bj_users') || '[]')
    const found = users.find(u => u.phone === phone && u.password === password)
    if (found) {
      setUser(found)
      localStorage.setItem('bj_user', JSON.stringify(found))
      return { success: true }
    }
    return { success: false, error: 'Incorrect phone number or password.' }
  }

  const signup = (name, phone, password) => {
    const users = JSON.parse(localStorage.getItem('bj_users') || '[]')
    if (users.find(u => u.phone === phone)) {
      return { success: false, error: 'This number is already registered.' }
    }
    const newUser = { id: Date.now(), name, phone, password, createdAt: new Date().toISOString() }
    users.push(newUser)
    localStorage.setItem('bj_users', JSON.stringify(users))
    setUser(newUser)
    localStorage.setItem('bj_user', JSON.stringify(newUser))
    return { success: true }
  }

  const updateProfile = (data) => {
    const updated = { ...user, ...data }
    const users = JSON.parse(localStorage.getItem('bj_users') || '[]')
    const idx = users.findIndex(u => u.id === user.id)
    if (idx !== -1) users[idx] = updated
    localStorage.setItem('bj_users', JSON.stringify(users))
    setUser(updated)
    localStorage.setItem('bj_user', JSON.stringify(updated))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('bj_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
