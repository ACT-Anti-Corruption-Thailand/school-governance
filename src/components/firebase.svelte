<script lang="ts">
	import { initializeApp } from 'firebase/app';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';

	import { app, auth, currentUser } from '../stores/firebaseapp';

	const firebaseConfig = {
		apiKey: 'AIzaSyDeazuYKUizHGDa4iCZCWBYDzAv1NCJb50',
		authDomain: 'rg-fbauth-testing.firebaseapp.com',
		projectId: 'rg-fbauth-testing',
		storageBucket: 'rg-fbauth-testing.appspot.com',
		messagingSenderId: '846994235165',
		appId: '1:846994235165:web:9971a7170be7eec7f34bf4'
	};

	$app = initializeApp(firebaseConfig);

	$: if ($app) $auth = getAuth($app);

	$: if ($auth)
		onAuthStateChanged($auth, (user) => {
			$currentUser = user;
		});
</script>
