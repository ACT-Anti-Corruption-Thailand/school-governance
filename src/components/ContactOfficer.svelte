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
		<img
			class="login-modal-logo"
			src="/logos/school_gov-b.svg"
			alt=""
			width="224"
			height="83"
			loading="lazy"
			decoding="async"
		/>
		<div class="f contact-text">
			<img src="/icons/chat.svg" alt="" width="20" height="20" loading="lazy" decoding="async" />
			<span>ติดต่อเจ้าหน้าที่</span>
		</div>
		<div class="login-success-aligner">
			<a
				class="f login-modal-btn"
				href="https://www.facebook.com/schoolgovTH"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img
					src="/icons/facebook.svg"
					alt=""
					width="24"
					height="24"
					loading="lazy"
					decoding="async"
				/>
				<span>Facebook</span>
			</a>
			<a
				class="f login-modal-btn"
				href="https://www.twitter.com/schoolgovTH"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img
					src="/icons/twitter.svg"
					alt=""
					width="24"
					height="24"
					loading="lazy"
					decoding="async"
				/>
				<span>Twitter</span>
			</a>
			<a
				class="f login-modal-btn"
				href="https://line.me/ti/g2/Joczl7Owr2VK_hGM1xUETXXq9wVLxRGEuZM7CQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default"
				target="_blank"
				rel="nofollow noopener noreferrer"
			>
				<img src="/icons/line.svg" alt="" width="24" height="24" loading="lazy" decoding="async" />
				<span>LINE OpenChat</span>
			</a>
		</div>
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
		height: auto;
		max-width: 224px;
	}

	.contact-text {
		margin: 8px 0;
		gap: 8px;
	}

	.login-modal-btn {
		padding: 8px 16px;
		gap: 16px;

		background: #fff;
		box-shadow: 0 1px 4px rgba(12, 22, 107, 0.2);
		border-radius: 200px;
		color: inherit;

		&,
		&:hover {
			text-decoration: none;
		}

		> span {
			flex: 1 1 0;
		}
	}

	.login-success-aligner {
		display: grid;
		grid-template-columns: max-content;
		justify-content: center;
		gap: 16px;
	}
</style>
