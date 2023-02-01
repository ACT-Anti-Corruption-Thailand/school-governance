<script lang="ts">
	import Modal from './Modal.svelte';

	export let contact_modal_isopen = false;
</script>

<Modal
	title="ติดต่อเจ้าหน้าที่"
	hideTitle
	bind:isOpen={contact_modal_isopen}
	body_class="f login-modal-body"
>
	<div class="f cmodal">
		<img class="login-modal-logo" src="/logos/school_gov-b.svg" alt="" width="224" height="83" />
		<div class="f contact-text">
			<img src="/icons/chat.svg" alt="" width="20" height="20" />
			<span>ติดต่อเจ้าหน้าที่</span>
		</div>
		<a
			class="f login-modal-btn"
			href="https://www.facebook.com/schoolgovTH"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img src="/icons/facebook.svg" alt="" width="24" height="24" />
			Facebook
		</a>
		<a
			class="f login-modal-btn"
			href="https://www.twitter.com/schoolgovTH"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img src="/icons/twitter.svg" alt="" width="24" height="24" />
			Twitter
		</a>
		<a
			class="f login-modal-btn"
			href="https://line.me/ti/g2/Joczl7Owr2VK_hGM1xUETXXq9wVLxRGEuZM7CQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
			target="_blank"
			rel="nofollow noopener noreferrer"
		>
			<img src="/icons/line.svg" alt="" width="24" height="24" />
			LINE OpenChat
		</a>
	</div>
</Modal>

<style lang="scss">
	.cmodal {
		flex-direction: column;
		gap: 16px;
		margin: auto;
		width: 100%;
		padding: 0 16px 16px;
	}

	.login-modal-logo {
		width: 50%;
	}

	.contact-text {
		margin: 8px 0;
		gap: 8px;
	}

	.login-modal-btn {
		padding: 8px 16px;
		gap: 8px;

		background: #ffffff;
		box-shadow: 0px 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 200px;
		color: inherit;

		&,
		&:hover {
			text-decoration: none;
		}
	}
</style>
