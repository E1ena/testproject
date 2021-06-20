module.exports = {
  name: 'app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
