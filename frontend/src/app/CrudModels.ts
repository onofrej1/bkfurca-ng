
const User = {
  title: 'Users',
  form: {
    password: 'hidden',
    roles: {
      type: 'pivotRelation',
      resourceTable: 'role',
      show: 'title',
    }
  },
  list: {
    password: 'hidden'
  }
}

const Article = {
  title: 'Articles',
  form: [
    {name: 'title', type: 'text'},
    {name: 'author', type: 'text'},
    {name: 'content', type: 'editor'},
    {
      name: 'tags', 
      type: 'relation', 
      resourceTable: 'tag', 
      multiple: true, 
      show: 'title', 
      label: 'Tags'},
  ],
  list: [
    {field: 'title', label: 'Title'},
  ]
}

const MenuItem = {
  title: 'Menu',
  form: {
    menu_id: {
      type: 'relation',
      resourceTable: 'menu',
      show: 'title',
      label: 'Menu'
    },
    page_id: {
      type: 'relation',
      resourceTable: 'page',
      label: 'Stranka',
      show: 'title',
    },
    parent_id: {
      type: 'relation',
      resourceTable: 'menuItem',
      show: 'title',
      label: 'Parent'
    },
  },
  list: {
    
  }
}

const Page = {
  title: "Pages",
  form: [
    { label: 'title', name: 'title', type: 'text'},
    { type: "editor", label: "Body", rows: 8, name: 'body'},
  ],
  list: [
    {field: 'title', label: 'Title', render: (row) => `<div>${row.title} xx</div>`},
    {field: 'body', label: 'Body'}
  ],
};

const Hamburg = {
  title: 'Hamburg',
  form: {
    event_date: {
      type: 'datetime'
    },
    notes: {
      type:'textarea',
      rows: 7
    }
  }
};

const Tag = { title: 'Tags'};

const models = { User, Page, Tag, Article, MenuItem, Hamburg };

export default models;
