import { writable } from 'svelte/store'

export interface Transaction {
	id: string
	title: string
	value: number
	type: 'income' | 'outcome'
}

export const transactions = writable<Transaction[]>([])
