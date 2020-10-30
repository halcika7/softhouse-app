export const trucText = (value, length) => {
    if (typeof value !== 'string') return value;

    if(value.length <= length) return value;

    return value.slice(0, length).concat('...');
}