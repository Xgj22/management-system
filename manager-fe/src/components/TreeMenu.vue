<template>
    <template v-for="menu in userMenu">
      <el-sub-menu
        v-if="
            menu.menuType == 1
        "
        :key="menu._id"
        :index="menu.path"
      >
        <template #title>
          <i :class="menu.icon"></i>
          <span>{{ menu.menuName }}</span>
        </template>
        <tree-menu :userMenu="menu.children" />
      </el-sub-menu>
      <el-menu-item
        v-else
        :index="menu.path"
        :key="menu._id"
        >{{ menu.menuName }}</el-menu-item
      >
    </template>
  </template>
  <script>
  export default {
    name: "TreeMenu",
    props: {
      userMenu: {
        type: Array,
        default() {
          return [];
        },
      },
    },
  };
  </script>

<style scoped>

</style>