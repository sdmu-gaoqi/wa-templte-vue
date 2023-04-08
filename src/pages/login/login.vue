<template>
  <LoginCard>
    <div class="loginBox">
      <WaInput
        :value="formState.account"
        :label="'请输入邮箱地址'"
        :change="changeAccount"
        :defaultValue="formState.account"
      />
      <WaInput
        :value="formState.password"
        :label="'请输入密码'"
        :change="changePassword"
        type="password"
        :defaultValue="formState.password"
      />
      <a-button type="primary" @click="login">登录</a-button>
    </div>
  </LoginCard>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import LoginCard from "../../components/loginCard/loginCard.vue";
import WaInput from "../../components/waInput/waInput.vue";
import _ from "lodash";
import { message } from "ant-design-vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    LoginCard,
    WaInput,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formState = reactive({
      account: "1224362143@qq.com",
      password: "123456",
    });
    const finish = (state: typeof formState) => {
      console.log(state);
    };
    const changeAccount = (event: string) => {
      formState.account = event;
    };
    const changePassword = (event: string) => {
      formState.password = event;
    };
    const login = () => {
      if (_.isEmpty(formState.account)) {
        return message.error("请输入邮箱账号");
      }
      if (_.isEmpty(formState.password)) {
        return message.error("请输入密码");
      }
      store
        .dispatch({
          type: "userInfo/login",
          data: {
            account: formState.account,
            token: Math.random().toString(16),
          },
        })
        .then(() => {
          message.success("登录成功");
          router.push("/home");
        });
    };
    return {
      formState,
      finish,
      changeAccount,
      changePassword,
      login,
    };
  },
});
</script>

<style lang="scss">
.loginBox {
  width: 400px;
  padding: 60px 40px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .inputWrapper {
    margin-bottom: 20px;
  }
}
</style>
