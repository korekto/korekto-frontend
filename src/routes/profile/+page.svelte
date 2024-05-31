<script lang="ts">
	import ProfileForm from './ProfileForm.svelte';
	import GitHubIntegration from './GitHubIntegration.svelte';
	import '$css/form.css';
</script>

<div class="text-column">
	<h1>Profile</h1>

	<div class="row">
		<ProfileForm />
		<GitHubIntegration />
	</div>
</div>
