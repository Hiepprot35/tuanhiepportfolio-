function isCharacterValid(inputValue) {
    if (!/^[A-Za-z]+$/.test(inputValue)) {
      alert('Vui lòng chỉ nhập chữ.');
      return false;
    }
    return true;
  }
  
  function isNumericValid(inputValue) {
    if (!/^\d+$/.test(inputValue)) {
      alert('Vui lòng chỉ nhập số.');
      return false;
    }
    return true;
  }
  
  function isSpecialValid(inputValue) {
    if (/[^A-Za-z0-9]/.test(inputValue)) {
      alert('Vui lòng không sử dụng ký tự đặc biệt.');
      return false;
    }
    return true;
  }
  
  export default function validation(inputValue) {
    const isCharacter = isCharacterValid(inputValue);
    const isNumeric = isNumericValid(inputValue);
    const isSpecial = isSpecialValid(inputValue);
  
    return {
      isCharacterValid: isCharacter,
      isNumericValid: isNumeric,
      isSpecialValid: isSpecial,
      isValid: isCharacter && isNumeric && isSpecial,
    };
  }
  