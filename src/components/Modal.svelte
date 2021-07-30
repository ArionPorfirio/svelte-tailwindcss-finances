<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'

	let modal: HTMLElement

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	const handle_keydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			close()
			return
		}

		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*')
			const tabbable = Array.from(nodes).filter(
				(n: HTMLElement) => n.tabIndex >= 0
			)

			let index = tabbable.indexOf(document.activeElement)
			if (index === -1 && e.shiftKey) index = 0

			index += tabbable.length + (e.shiftKey ? -1 : 1)
			index %= tabbable.length
			;(tabbable[index] as HTMLElement).focus()
			e.preventDefault()
		}
	}

	const previously_focused =
		typeof document !== 'undefined' && document.activeElement

	if (previously_focused) {
		onDestroy(() => {
			;(previously_focused as HTMLElement).focus()
		})
	}
</script>

<svelte:window on:keydown="{handle_keydown}" />

<div
	class="fixed inset-0 w-full h-full bg-black bg-opacity-50"
	on:click="{close}"
	in:fade
	out:fade
></div>

<div
	class="fixed inset-2/4 -translate-x-2/4 -translate-y-2/4 overflow-auto w-max h-max max-h-screen flex flex-col gap-10 p-10 rounded-lg bg-gray-900"
	role="dialog"
	aria-modal="true"
	in:fade
	out:fade
>
	<slot name="header" />
	<slot />
</div>
