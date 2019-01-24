<template>
  <div>
    <div>
      <button @click="get()">{{getMsg}}</button>
    </div>
    <div>
      <button @click="getOne()">{{getOneMsg}}</button>
    </div>
    <div>
      <button @click="put()">{{putMsg}}</button>
    </div>
    <div>
      <button @click="post()">{{postMsg}}</button>
    </div>
    <div>
      <button @click="del()">{{deleteMsg}}</button>
    </div>
  </div>
</template>

<script>
import { get, post, put, del, getOne } from "../api/cross";
/* eslint-disable */
export default {
  name: "HelloWorld",
  data() {
    return {
      getMsg: "GET ALL",
      getOneMsg: "GET ONE",
      putMsg: "PUT",
      postMsg: "POST",
      deleteMsg: "DELETE"
    };
  },
  methods: {
    get() {
      get().then(response => {
        console.log(response);
      });
    },
    getOne() {
      const id = "10000001";
      getOne(id).then(response => {
        console.log(response);
      });
    },
    put() {
      const id = "10000001";
      const username = "vi";
      const password = "123456";
      put(id, username, password).then(response => {
        console.log(response);
      });
    },
    post() {
      const username = "vi";
      const password = "123456";
      post(username, password).then(response => {
        console.log(response);
      });
    },
    del() {
      const id = "10000001";
      del(id).then(response => {
        console.log(response);
      });
    }
  }
};
</script>