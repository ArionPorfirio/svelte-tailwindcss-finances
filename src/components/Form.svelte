<script lang="ts">
	import type { Transaction } from 'stores/transactions'

	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	type TransactionTypes = 'income' | 'outcome'

	export let action: 'create' | 'update'
	export let defaultValues: Transaction

	let title = defaultValues?.title ?? ''
	let value = defaultValues?.value ?? 0
	let type: TransactionTypes | undefined = defaultValues?.type
</script>

<form
	on:submit|preventDefault="{() =>
		dispatch(action === 'update' ? 'update' : 'create', {
			...(Boolean(defaultValues) ? { id: defaultValues.id } : {}),
			title,
			value,
			type
		})}"
	class="grid gap-4 w-full"
>
	<div class="grid gap-1">
		<label class="text-gray-200" for="transaction_title">Título</label>
		<input
			type="text"
			id="trasnaction_title"
			name="title"
			bind:value="{title}"
			class="p-1 rounded-md"
		/>
	</div>

	<div class="grid gap-1">
		<label class="text-gray-200" for="transaction_value">Valor <i>R$</i></label>
		<input
			type="number"
			id="transaction_value"
			name="value"
			min="{1}"
			bind:value
			class="p-1 rounded-md"
		/>
	</div>

	<ul class="grid grid-cols-2 gap-4 mx-auto">
		<li class="flex items-center gap-2">
			<input
				type="radio"
				id="transaction_type_income"
				name="transaction_type"
				value="income"
				bind:group="{type}"
				class="h-5 w-5 text-green-600"
			/>
			<label class="text-gray-200" for="transaction_type_income">
				Entrada
			</label>
		</li>

		<li class="flex items-center gap-2">
			<input
				type="radio"
				id="transaction_type_outcome"
				name="transaction_type"
				value="outcome"
				bind:group="{type}"
				class="h-5 w-5 text-red-600"
			/>
			<label class="text-gray-200" for="transaction_type_outcome">
				Saída
			</label>
		</li>
	</ul>

	{#if Boolean(title) && Boolean(value) && Boolean(type)}
		<button
			type="submit"
			class="bg-blue-600 py-2 text-sm font-semibold tracking-wider border border-blue-800 text-blue-100 rounded-md hover:shadow-lg hover:bg-blue-700"
		>
			Salvar
		</button>
	{/if}
</form>
