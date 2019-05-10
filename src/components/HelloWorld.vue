<template>
  <div>
    <div class="uploadDiv1">
      <uploader
        ref="uploader"
        :options="uploadOptions1"
        :autoStart="true"
        @file-added="onFileAdded1"
        @file-success="onFileSuccess1"
        @file-progress="onFileProgress1"
        @file-error="onFileError1"
        class="uploader-app"
      >
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <uploader-btn style="margin-right:20px;" :attrs="attrs">选择文件</uploader-btn>

          <uploader-btn :attrs="attrs" directory>选择文件夹</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
    <div class="uploadDiv2">
      <uploader
        ref="uploader"
        :options="uploadOptions2"
        :autoStart="true"
        :files="files"
        @file-added="onFileAdded2"
        @file-success="onFileSuccess2"
        @file-progress="onFileProgress2"
        @file-error="onFileError2"
        class="uploader-app"
      >
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
          <uploader-btn :attrs="attrs">分块上传</uploader-btn>
        </uploader-drop>
        <uploader-list></uploader-list>
      </uploader>
    </div>
  </div>
</template>

<script>
import { merge } from "../api/upload";

/* eslint-disable */
export default {
  name: "HelloWorld",
  data() {
    return {
      files: [],
      uploadOptions1: {
        target: "//localhost:18080/api/upload/single",
        testChunks: false, //是否开启服务器分片校验
        fileParameterName: "file",
        headers: {},
        query() {},
        categaryMap: {
          image: ["gif", "jpg", "jpeg", "png", "bmp"]
        }
      },
      uploadOptions2: {
        target: "//localhost:18080/api/upload/chunk",
        chunkSize: 1 * 1024 * 1024,
        testChunks: true,
        checkChunkUploadedByResponse: function(chunk, message) {
          let objMessage = JSON.parse(message);
          let chunkNumbers = objMessage.chunkNumbers;
          return (chunkNumbers || []).indexOf(chunk.offset + 1) >= 0;
        },
        headers: {},
        query() {},
        categaryMap: {
          image: ["gif", "jpg", "jpeg", "png", "bmp"],
          zip: ["zip"],
          document: ["csv"]
        }
      },
      attrs: {},
      panelShow: false, //选择文件后，展示上传panel
      collapse: false
    };
  },
  methods: {
    onFileAdded1(file) {
      console.log(file);
    },
    onFileProgress1(rootFile, file, chunk) {},
    onFileSuccess1(rootFile, file, response, chunk) {},
    onFileError1(rootFile, file, response, chunk) {},
    onFileAdded2(file) {
      console.log(file);
    },
    onFileProgress2(rootFile, file, chunk) {},
    onFileSuccess2(rootFile, file, response, chunk) {
      let res = JSON.parse(response);
      if (res.code == 1) {
        return;
      }
      if (res.code == 205) {
        const formData = new FormData();
        formData.append("identifier", file.uniqueIdentifier);
        formData.append("filename", file.name);
        merge(formData).then(response => {});
      } else {
      }
    },
    onFileError2(rootFile, file, response, chunk) {
      this.$message({
        message: response,
        type: "error"
      });
    }
  }
};
</script>