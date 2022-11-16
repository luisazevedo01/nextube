function omit<T>(obj: T, property: keyof T | (keyof T)[]) {

  if(Array.isArray(property)){
    const entries = Object.entries(obj).filter((item) => {
      const [key] = item;

      return !property.includes(key as keyof T)
    })

    return Object.fromEntries(entries)
  }

  const { [property]: unused, ...rest } = obj

  return rest
}

const t = {
  username: 'luis',
  age: 7,
}

omit(t, 'username')

export default omit
