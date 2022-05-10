<template>
  <div id="app">

      <b-navbar toggleable="sm" type="light" variant="light" class="navbar-margin">
        <b-navbar-toggle target="nav-text-collapse" text-center></b-navbar-toggle>
        <b-navbar-brand class="brand">
          <b-icon icon="cup-straw" style="color: #7B7CE1;"></b-icon>
          Cafe name</b-navbar-brand>
        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/">Замовлення</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/menu">Меню</router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/kitchen">Кухня</router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>

    <router-view/>
  </div>
</template>

<style>

.navbar-margin{
  background-color: white !important;
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.15);
}


#app {
  font-family: Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

#nav-text-collapse a {
  text-decoration:none;
  font-weight: bold;
  color: #000000;
  padding: 10px!important;
}

#nav-text-collapse a.router-link-exact-active {
  text-decoration:none;
  color: #7B7CE1;
}

.brand{
  font-weight: bold!important;
  color: #7B7CE1!important;
  padding: 10px 8% !important;
}
</style>
