module.exports = {
    style: {
      sass: {
        loaderOptions: {
          additionalData: `
            @import "src/assets/sass/index.scss";
          `,
        },
      },
    },
};