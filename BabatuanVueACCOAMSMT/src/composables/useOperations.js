import { ref, onMounted } from 'vue'

export function useOperations() {
    const operations = ref([])

    function loadOperations() {
        const saved = localStorage.getItem('accoamsmt_operations')
        if (saved) {
            operations.value = JSON.parse(saved)
        }
    }

    function saveToStorage() {
        localStorage.setItem('accoamsmt_operations', JSON.stringify(operations.value))
    }

    function addOperation(newOp) {
        operations.value.push({
            id: Date.now(),
            ...newOp,
            is_active: true
        })
        saveToStorage()
    }

    function toggleStatus(id) {
        const op = operations.value.find(o => o.id === id)
        if (op) {
            op.is_active = !op.is_active
            saveToStorage()
        }
    }

    function removeOperation(id) {
        operations.value = operations.value.filter(o => o.id !== id)
        saveToStorage()
    }

    onMounted(() => {
        loadOperations()
    })

    return {
        operations,
        addOperation,
        toggleStatus,
        removeOperation
    }
}
