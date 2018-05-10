
const User = {
  title: 'Users',
  form: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'roles', type: 'pivotRelation', resourceTable: 'role', show: 'title', label: 'Roles' },
  ],
  list: [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
  ]
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
    { field: 'author', label: 'Author' },
  ]
}

const MenuItem = {
  title: 'Menu',
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Menu', name: 'menu_id', type: 'relation', resourceTable: 'menu', show: 'title' },
    { label: 'Page', name: 'page_id', type: 'relation', resourceTable: 'page', show: 'title' },
    { label: 'Parent', name: 'parent_id', type: 'relation', resourceTable: 'menuItem', show: 'title' },
    { label: 'Link', name: 'link', type: 'text'}
  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
}

const Page = {
  title: "Pages",
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { type: "editor", label: "Body", rows: 8, name: 'body' },
  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
};

const Hamburg = {
  title: "Pages",
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Date', name: 'event_date', type: 'datepicker' },
    { label: "Notes", type: "textarea", rows: 8, name: 'notes' },
  ],
  list: [
    { field: 'title', label: 'Title' },
    { label: 'Date', render: (row) => `<div>${row.event_date}</div>` }
  ],
};

const Tag = { 
  title: "Tags",
  form: [
    { label: 'title', name: 'title', type: 'text' },
  ],
  list: [
    { field: 'title', label: 'Title' }
  ]
};

const models = { User, Page, Tag, Article, MenuItem, Hamburg };

export default models;
