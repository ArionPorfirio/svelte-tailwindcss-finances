<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	import { toCurrency } from '$lib/valueFormatters'

	import type { Transaction } from 'stores/transactions'

	const transactionTypes = {
		income: {
			intl: 'Entrada',
			color: 'bg-green-600'
		},
		outcome: {
			intl: 'Saída',
			color: 'bg-red-600'
		}
	}

	export let transactions: Transaction[]

	const dispatch = createEventDispatcher()
</script>

<div class="flex justify-center px-4 pb-4">
	<table
		class="min-w-max w-full table-auto table text-gray-400 border-separate space-y-6 text-sm"
	>
		<thead class="bg-gray-800 text-gray-500">
			<tr>
				<th class="p-3 text-left">Título</th>
				<th class="p-3 text-left">Valor</th>
				<th class="p-3 text-left">Tipo</th>
				<th class="p-3 text-left">Edição</th>
			</tr>
		</thead>
		<tbody>
			{#each transactions as transaction (transaction.id)}
				<tr class="bg-gray-800">
					<td class="p-3">
						{transaction.title}
					</td>
					<td class="p-3 font-bold">
						{toCurrency(transaction.value)}
					</td>
					<td class="p-3">
						<span
							class="{`${
								transactionTypes[transaction.type].color
							} text-gray-50 rounded-md px-2`}"
						>
							{transactionTypes[transaction.type].intl}
						</span>
					</td>
					<td class="p-3 ">
						<a
							href="/"
							on:click|preventDefault="{() =>
								dispatch('open_edition', { ...transaction })}"
							class="text-gray-400 hover:text-gray-100  mx-2"
						>
							<i class="material-icons-outlined text-base">edit</i>
						</a>
						<a
							href="/"
							on:click|preventDefault="{() =>
								dispatch('delete_transaction', { id: transaction.id })}"
							class="text-gray-400 hover:text-gray-100  ml-2"
						>
							<i class="material-icons-round text-base">delete_outline</i>
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table {
		border-spacing: 0 15px;
	}

	i {
		font-size: 1rem !important;
	}

	.table tr {
		border-radius: 20px;
	}

	tr td:nth-child(n + 4),
	tr th:nth-child(n + 4) {
		border-radius: 0 0.625rem 0.625rem 0;
	}

	tr td:nth-child(1),
	tr th:nth-child(1) {
		border-radius: 0.625rem 0 0 0.625rem;
	}
</style>
