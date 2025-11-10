/**
 * Telefon raqamini formatlash funksiyasi
 * Format: +998 99 465 55 55
 * Faqat raqamlarni qabul qiladi va +998 prefiksini avtomatik qo'shadi
 */

/**
 * Telefon raqamini formatlash
 * @param {string} value - Input qiymati
 * @returns {string} - Formatlangan telefon raqami (+998 99 465 55 55)
 */
export const formatPhoneNumber = (value) => {
  // Faqat raqamlarni olish
  const digits = value.replace(/\D/g, '')
  
  // Agar bo'sh bo'lsa, +998 qaytarish
  if (!digits) {
    return '+998 '
  }
  
  // Agar 998 bilan boshlansa, uni olib tashlash (chunki +998 avtomatik qo'shiladi)
  const cleanDigits = digits.startsWith('998') ? digits.slice(3) : digits
  
  // Maksimal 9 ta raqam (998 dan keyin)
  const limitedDigits = cleanDigits.slice(0, 9)
  
  // Formatlash: +998 XX XXX XX XX
  let formatted = '+998 '
  
  if (limitedDigits.length > 0) {
    formatted += limitedDigits.slice(0, 2)
  }
  if (limitedDigits.length > 2) {
    formatted += ' ' + limitedDigits.slice(2, 5)
  }
  if (limitedDigits.length > 5) {
    formatted += ' ' + limitedDigits.slice(5, 7)
  }
  if (limitedDigits.length > 7) {
    formatted += ' ' + limitedDigits.slice(7, 9)
  }
  
  return formatted
}

/**
 * Telefon raqamini tozalash (faqat raqamlarni qaytarish)
 * @param {string} value - Formatlangan telefon raqami
 * @returns {string} - Faqat raqamlar (+998 bilan)
 */
export const cleanPhoneNumber = (value) => {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('998')) {
    return `+${digits}`
  }
  return `+998${digits}`
}

/**
 * Telefon raqami input handler
 * @param {Event} e - Input change event
 * @param {Function} setValue - State setter funksiyasi
 */
export const handlePhoneInputChange = (e, setValue) => {
  const inputValue = e.target.value
  
  // Agar +998 ni o'chirishga harakat qilinsa, uni qaytarish
  if (!inputValue.startsWith('+998')) {
    setValue('+998 ')
    return
  }
  
  // Formatlash
  const formatted = formatPhoneNumber(inputValue)
  setValue(formatted)
}

