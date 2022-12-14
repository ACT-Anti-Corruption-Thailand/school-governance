<script lang="ts">
	import 'styles/main.scss';

	import Firebase from 'components/Firebase.svelte';
	import MainNav from 'components/Navbar.svelte';
	import CookieConsent from 'components/CookieConsent.svelte';
	import GoTop from 'components/GoTop.svelte';

	import Modal from 'components/Modal.svelte';

	let isModalOpen = false;
</script>

<Firebase />
<MainNav />
<!-- <CookieConsent /> -->
<main id="#main">
	<slot />
</main>
<GoTop />

<Modal bind:isOpen={isModalOpen} title="Test Title">
	<p>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, doloremque, nihil esse nisi earum
		exercitationem modi blanditiis minus harum aliquam quo cupiditate! Dolore consequuntur qui
		consectetur, veniam fugit laudantium consequatur.
	</p>
	<p>
		Molestiae, doloremque aut. Repellendus voluptates suscipit accusantium magni. Quos quo, eos amet
		laboriosam aperiam vel fuga neque qui, alias omnis ut tenetur esse deserunt consequuntur beatae,
		iste sapiente consectetur. Alias.
	</p>
	<p>
		Repudiandae quisquam ullam ex doloremque, voluptatum culpa non labore voluptatem, tempora sunt
		aut deleniti modi neque quis tempore odio at! Iusto pariatur cupiditate quibusdam molestiae enim
		deleniti in harum modi!
	</p>
	<p>
		Fugit, perspiciatis. Laborum facere eos cumque maiores delectus dignissimos atque, nisi pariatur
		quibusdam labore facilis sequi ex incidunt eveniet aliquam at alias? Voluptates ea maxime minus?
		Doloremque atque voluptatum dolor.
	</p>
	<p>
		Maxime quibusdam ad aliquid deserunt dicta dignissimos sequi necessitatibus voluptatem. Alias
		earum, nisi quas iusto ex deserunt maxime quod aliquam rerum a ut, impedit eligendi non fugit!
		Totam, voluptatum quis.
	</p>
	<p>
		In molestiae, consectetur vitae fugit inventore itaque consequatur dolor sapiente assumenda at
		sit enim maxime illum eligendi quos. Ut, qui. Corrupti fugit laborum consequatur. Ducimus
		voluptates animi sapiente fugiat atque!
	</p>
	<p>
		Ipsam eaque provident nesciunt qui minus neque sunt autem fugiat sit earum, quae nam aliquam
		inventore similique culpa sapiente. Laborum ex deserunt cumque repellat qui modi vero sed.
		Accusamus, atque!
	</p>
	<p>
		Aliquid maxime laborum blanditiis praesentium adipisci architecto labore assumenda alias, unde,
		eum esse. Possimus, provident quisquam? Iure ad repellendus perferendis exercitationem cum
		cupiditate. Perspiciatis quasi culpa qui fugiat. Dolorum, dolores?
	</p>
	<p>
		Aperiam itaque qui, quo aspernatur, voluptas nihil cupiditate quaerat debitis repudiandae error
		nostrum explicabo non eum saepe. Mollitia deserunt adipisci ipsa fugit maxime! Animi qui,
		aperiam quaerat distinctio nulla libero?
	</p>
	<p>
		Assumenda iusto officiis sed totam quo? Dolore quod aut debitis soluta totam quibusdam ut
		architecto qui quidem, quisquam eaque repellat eius ratione veniam dolores accusantium, fugit
		rem voluptatem laboriosam explicabo.
	</p>
</Modal>
