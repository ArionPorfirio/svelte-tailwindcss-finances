<script lang="ts">
	import { toCurrency } from '$lib/valueFormatters'

	export let income: number
	export let outcome: number
	export let balance: number

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL'
		}).format(value)
</script>

<section class="grid md:grid-cols-3 gap-4 px-4 pb-2">
	<div
		class="p-4 border-2 border-gray-600 rounded-lg bg-gray-700 flex justify-between"
	>
		<h2 class="text-2xl text-gray-100">Entrada</h2>
		<h2 class="text-2xl text-gray-100 text-">
			<i>{toCurrency(income)}</i>
		</h2>
	</div>
	<div
		class="p-4 border-2 border-gray-600 rounded-lg bg-gray-700 flex justify-between"
	>
		<h2 class="text-2xl text-gray-100">Saída</h2>
		<h2 class="text-2xl text-gray-100 text-">
			<i>{toCurrency(outcome)}</i>
		</h2>
	</div>
	<div
		class="p-4 border-2 border-gray-600 rounded-lg bg-gray-700 flex justify-between"
	>
		<h2 class="text-2xl text-gray-100">Saldo</h2>
		<h2 class="text-2xl text-gray-100 text-">
			<i>{toCurrency(balance)}</i>
		</h2>
	</div>
</section>
