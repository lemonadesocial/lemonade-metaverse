export const generateTagging = (
  tags: Record<string, string>
) => {
  return '' +
    '<Tagging>' +
      '<TagSet>' +
        Object.entries(tags).map(([key, value]) => '' +
          '<Tag>' +
            `<Key>${key}</Key>` +
            `<Value>${value}</Value>` +
          '</Tag>'
        ).join('') +
      '</TagSet>' +
    '</Tagging>';
};
