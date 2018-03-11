
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
    { name: 'title', type: 'text' },
    { name: 'author', type: 'text' },
    { name: 'content', type: 'editor' },
    { name: 'tags', type: 'pivotRelation', resourceTable: 'tag', show: 'title', label: 'Tags' },
  ],
  list: [
    { field: 'title', label: 'Title' },
  ]
}

const MenuItem = {
  title: 'Menu',
  form: [
    { name: 'title', type: 'text' },
    { label: 'Menu', name: 'menu_id', type: 'relation', resourceTable: 'menu', show: 'title' },
    { label: 'Page', name: 'page_id', type: 'relation', resourceTable: 'page', show: 'title' },

  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
}

const Page = {
  title: "Pages",
  form: [
    { label: 'title', name: 'title', type: 'text' },
    { type: "editor", label: "Body", rows: 8, name: 'body' },
  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
};

const Hamburg = {
  title: 'Hamburg',
  form: {
    event_date: {
      type: 'datetime'
    },
    notes: {
      type: 'textarea',
      rows: 7
    }
  }
};

const Tag = { title: 'Tags' };

const models = { User, Page, Tag, Article, MenuItem, Hamburg };

export default models;
