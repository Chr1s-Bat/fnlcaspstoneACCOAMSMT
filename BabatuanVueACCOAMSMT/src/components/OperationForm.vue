<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit-operation'])

const form = reactive({
    directive_name: '',
    details: '',
    domain_type: 'Military',
    execution_date: ''
})

const submitForm = () => {
    if (!form.directive_name || !form.execution_date) {
        alert('Please fill out all required fields.')
        return
    }
    emit('submit-operation', { ...form })
    form.directive_name = ''
    form.details = ''
    form.execution_date = ''
}
</script>

<template>
  <form @submit.prevent="submitForm" class="p-4 bg-slate-900 text-white rounded shadow">
    <h3 class="text-lg font-bold mb-3">Issue Directive Command</h3>
    <div class="mb-2">
      <label>Directive Name:</label>
      <input v-model="form.directive_name" type="text" class="w-full p-1 text-black rounded" required />
    </div>
    <div class="mb-2">
      <label>Domain Category:</label>
      <select v-model="form.domain_type" class="w-full p-1 text-black rounded">
        <option>Military</option>
        <option>Smuggling</option>
        <option>Psyop</option>
        <option>Marketing</option>
        <option>Trading</option>
      </select>
    </div>
    <div class="mb-2">
      <label>Details / Scope:</label>
      <textarea v-model="form.details" class="w-full p-1 text-black rounded"></textarea>
    </div>
    <div class="mb-2">
      <label>Execution Date:</label>
      <input v-model="form.execution_date" type="date" class="w-full p-1 text-black rounded" required />
    </div>
    <button type="submit" class="mt-2 bg-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-500">
      Dispatch Order
    </button>
  </form>
</template>
