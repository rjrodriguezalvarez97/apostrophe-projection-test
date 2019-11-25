module.exports = {
  name: "example",
  extend: "apostrophe-pieces",
  label: "Example",
  pluralLabel: "Examples",
  addFields: [
    {
      name: "fields",
      label: "Array of fields",
      type: "array",
      titleField: "Array Label",
      schema: [
        {
          name: "fieldName",
          type: "string",
          label: "Field name"
        },
        {
          name: "fieldValue",
          label: "Field Value",
          type: "string"
        }
      ]
    },
    {
      name: "otherField",
      label: "Not interested in you",
      type: "string",
      def: "Hi!"
    }
  ],
  construct: function(self, options) {
    self.addTask("test", "Test projection on array field", (apos, argv) => {
      // We need a `req` object, but we're in a task. So
      // ask the tasks module for an "anon" req that can
      // do only what the public can do. We could also call
      // `apos.tasks.getReq()`, which lets us do anything (admin).

      const req = apos.tasks.getReq();

      // Let's use apostrophe cursors, so that we only get public,
      // published products, and the _url property is dynamically set.

      return self
        .find(req)
        // .projection({ fields: 1 })
        .projection({ otherField: 1})
        .toArray()
        .then(products => {
          products.forEach(product => {
            console.log(product);
          });
        });

      // We don't need to "catch" here because the task runner will
      // catch and display any error that rejects the promise
    });
  }
};
