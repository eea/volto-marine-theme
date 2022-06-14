const MsfdDataExplorerBlockSchema = {
  title: 'Data Explorer Block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['article_select'],
    },
  ],

  properties: {
    article_select: {
      title: 'Select article',
      choices: [
        ['marine-units', 'Article 4'],
        ['competent-authorities', 'Article 7'],
        ['msfd-a8', 'Article 8'],
        ['msfd-a9', 'Article 9'],
        ['msfd-a10', 'Article 10'],
        ['msfd-c2', 'Article 11'],
        ['msfd-c3', 'Article 13 & 18'],
        ['msfd-a14', 'Article 14'],
        ['msfd-c6', 'Article 19.3'],
      ],
    },
  },
  required: ['article_select'],
};

export default MsfdDataExplorerBlockSchema;
