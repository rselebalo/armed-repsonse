export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
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
      name: 'All',
      url: '/panics',
      icon: 'icon-drop',
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
      url: '/client',
      icon: 'icon-puzzle'      
    },
    {
      name: 'Update',
      url: '/client',
      icon: 'icon-cursor',
    }
  ],
};
