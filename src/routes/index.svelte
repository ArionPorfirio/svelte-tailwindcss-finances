<script lang="ts">
	import Balance from 'components/Balance.svelte'
	import Form from 'components/Form.svelte'
	import Modal from 'components/Modal.svelte'
	import Navbar from 'components/Navbar.svelte'
	import Table from 'components/Table.svelte'

	import type { Transaction } from 'stores/transactions'
	import { transactions } from 'stores/transactions'

	let showModal = false
	let modalAction: 'create' | 'update'
	let editTransaction: Transaction

	const closeModal = () => {
		modalAction = undefined
		showModal = false
		editTransaction = undefined
	}

	const openCreateHandler = () => {
		modalAction = 'create'
		showModal = true
	}

	const openEditionHandler = (event: { detail: Transaction }) => {
		editTransaction = { ...event.detail }
		modalAction = 'update'
		showModal = true
	}

	const createHandler = (event: { detail: Omit<Transaction, 'id'> }) => {
		transactions.update((current) => [
			{ ...event.detail, id: String(Math.random()).split('.')[1].slice(0, 5) },
			...current
		])

		closeModal()
	}

	const updateHandler = (event: { detail: Transaction }) => {
		transactions.set(
			$transactions.map((transaction) => {
				if (transaction.id === event.detail.id) {
					return { ...event.detail }
				}

				return transaction
			})
		)

		closeModal()
	}

	const deleteHandler = (event: { detail: { id: string } }) => {
		transactions.set($transactions.filter((t) => t.id !== event.detail.id))
	}

	let income = 0
	let outcome = 0
	let balance = 0

	$: {
		;({ income, outcome } = $transactions.reduce(
			(c, t) => ({ ...c, [t.type]: c[t.type] + t.value }),
			{ income: 0, outcome: 0 }
		))

		balance = income - outcome
	}
</script>

<Navbar on:click="{openCreateHandler}" />
<Balance income="{income}" outcome="{outcome}" balance="{balance}" />
<Table
	transactions="{$transactions}"
	on:open_edition="{openEditionHandler}"
	on:delete_transaction="{deleteHandler}"
/>

{#if showModal}
	<Modal on:close="{closeModal}">
		<h2 class="text-4xl text-gray-200">Criar Nova Transação</h2>
		<Form
			on:create="{createHandler}"
			on:update="{updateHandler}"
			action="{modalAction}"
			defaultValues="{editTransaction}"
		/>
	</Modal>
{/if}
