
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
  form: {
    content: {
      type: 'ckeditor'
    },
    created_at: {
      type: 'datetime'
    },
    tags: {
      type: 'pivotRelation',
      resourceTable: 'tag',
      show: 'title',
    }
  },
  list: {
    
    content: 'hidden',
    source: 'hidden',
  }
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
  form: {
    title: {
      type: 'text',
      label: 'title',
      order: 8,
    },
    body: {
      type: "editor",
      label: "Body",
      rows: 8,
      order: 3,
    },
  },
  list: {
    body: 'hidden',
  }
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
