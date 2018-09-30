export default (
    message: string,
    textColor: keyof string = 'white',
    borderColor: keyof string = 'gray'
) => {
    const width = message.length + 6;
    const banner = `/${'*'.repeat(width)}/`[borderColor];
    console.log();
    console.log(banner);
    console.log(`/*${' '.repeat(message.length + 4)}*/`[borderColor]);
    console.log('/* '[borderColor], message[textColor], ' */'[borderColor]);
    console.log(`/*${' '.repeat(message.length + 4)}*/`[borderColor]);
    console.log(banner, '\n');
};
