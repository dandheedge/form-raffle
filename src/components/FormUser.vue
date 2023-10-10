<script setup>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useNotification } from '@kyvg/vue3-notification'
import { addUser } from '@/vuetils/user'
const { notify } = useNotification()
const state = reactive({
  fullname: '',
  email: '',
  phone: '',
  address: '',
  zipcode: ''
})
const rules = {
  fullname: { required }, // Matches state.firstName
  email: { required, email }, // Matches state.lastName
  phone: { required },
  address: { required },
  zipcode: { required }
}
const v$ = useVuelidate(rules, state)
async function handleSubmit() {
  console.log(state)
  const res = await addUser(state)
  if (res.length > 0) {
    notify('Success')
  } else {
    notify('Error')
  }
}
</script>
<template>
  <div class="container">
    <form @submit.prevent="handleSubmit()">
      <label for="email">Register to our Raffle</label>
      <input id="fullname" type="text" v-model="state.fullname" placeholder="full name" required />
      <input id="email" type="text" v-model="state.email" placeholder="email address" required />
      <div v-if="v$.email.email.$invalid">{{ v$.email.email.$message }}</div>
      <input id="phone" type="text" v-model="state.phone" placeholder="phone number" required />
      <textarea id="address" type="text" v-model="state.address" placeholder="address"></textarea>
      <input id="zipcode" type="text" v-model="state.zipcode" placeholder="zipcode" />
      <input type="submit" value="Register" name="subscribe" />
    </form>
  </div>
</template>
