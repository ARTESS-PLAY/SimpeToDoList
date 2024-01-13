export const config = {
    port: process.env.PORT || '-',
    mongodbURL:
        process.env.MONGODBURL ||
        '-',
    secret: process.env.SECRET || '-',
};
