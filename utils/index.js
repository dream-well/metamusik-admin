export const truncateAddress = (address, dots = 6) => {
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{5})[a-zA-Z0-9]+([a-zA-Z0-9]{6})$/
    );
    if (!match) return address;
    return `${match[1]}${' .'.repeat(dots)} ${match[2]}`;
};

export function getCellText(row, col) {
  if(typeof col.value == 'string') {
      switch(typeof row[col.value]) {
          case 'string':
              return row[col.value];
          case 'number':
              return Number(row[col.value]).toString();
          case 'undefined':
              return "";
          default:
              return "";
      }
      if(isNan(row[col.value])) return '';
      return row[col.value].toString();
  }
  if(typeof col.value == 'function') 
      return col.value(row);
}