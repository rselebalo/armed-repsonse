export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Panics',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Active',
      url: '/panics/active',
      icon: 'icon-drop',
    },
    {
      name: 'All',
      url: '/panics/all',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Clients',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Register',
      url: '/base',
      icon: 'icon-puzzle'      
    },
    {
      name: 'Update',
      url: '/buttons',
      icon: 'icon-cursor',
    }
  ],
};
