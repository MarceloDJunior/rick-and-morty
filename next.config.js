// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
  include: /\.svg$/,
});
