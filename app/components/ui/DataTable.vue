<template>
  <div class="overflow-x-auto rounded-lg border border-slate-700 bg-slate-800/50 shadow-sm">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="border-b border-r border-slate-600 px-4 py-3 text-left text-sm font-medium text-slate-300 last:border-r-0"
          >
            {{ column.label }}
          </th>
          <th 
          v-if="$slots.actions"
          class="border-b border-r border-slate-600 px-4 py-3 text-left text-sm font-medium text-slate-300 last:border-r-0"
          >
              Actions
          </th>
        </tr>
      </thead>
      <tbody v-if="loading">
        <tr v-for="i in 5" :key="i">
          <td
            v-for="j in ((columns.length || 1) + ($slots.actions ? 1 : 0))"
            :key="j"
            class="border-b border-r border-slate-700 px-4 py-3 last:border-r-0"
          >
            <span class="block h-5 w-20 animate-pulse rounded bg-slate-600" />
          </td>
        </tr>
      </tbody>
      <tbody v-else-if="rows.length === 0">
        <tr>
          <td
            :colspan="(columns.length || 1) + ($slots.actions ? 1 : 0)"
            class="border-b border-slate-700 px-4 py-12 text-center text-slate-500"
          >
            <slot name="empty">
              No data
            </slot>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="(row, i) in rows"
          :key="String(row.id ?? i)"
          class="transition-colors hover:bg-slate-700/30"
          :class="{ 'cursor-pointer': props.rowHref }"
          @click="handleRowClick(row)"
        >
        <td
            v-for="column in columns"
            :key="column.key"
            class="border-b border-r border-slate-700 px-4 py-3 text-sm text-slate-200 last:border-r-0"
        >
            {{ row[column.key] ?? '—' }}
        </td>
        <td 
        v-if="$slots.actions" 
        class="border-b border-r border-slate-700 px-4 py-3 text-sm text-slate-200 last:border-r-0"
        @click.stop
        :row="row"
        >
            <slot name="actions" :row="row">
                
            </slot>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rows: Record<string, unknown>[]
  columns: {
    key: string
    label: string
  }[]
  loading?: boolean
  rowHref?: (row: Record<string, unknown>) => string
}>()

function handleRowClick(row: Record<string, unknown>) {
  if (props.rowHref) {
    navigateTo(props.rowHref(row))
  }
}
</script>