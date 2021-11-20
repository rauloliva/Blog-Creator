const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (_, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return
        }
        seen.add(value)
      }
      return value
    }
}

export const post_request = (url, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const responseObj = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data, getCircularReplacer())
            })
        
            const response = await responseObj.json()
            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}