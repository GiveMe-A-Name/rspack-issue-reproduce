export const a = function () {
    console.log(this, arguments);
    const b = () => console.log('aaa', this, arguments);
    b();
};
