<script>
	var offset = Math.floor(Math.random() * 200);
	var imgIndex = Math.random();

	var user = {
		name: 'Toto',
		role: 'Student'
	};
</script>

<div class="media align-items-center">
	<div>
		<img
			src={`https://thispersondoesnotexist.com/?rand_number=${imgIndex}`}
			alt="..."
			width="65"
			class="rounded-circle"
		/>
		<div class="media-body">
			<h4 class="username">{user.name}</h4>
			<p class="role">{user.role}</p>
		</div>
	</div>
</div>

<style>
	img.rounded-circle {
		border-radius: 50%;
		border: 0.4rem double #808080;
	}
	.media {
		display: flex;
		margin-top: 50px;
	}
	.align-items-center {
		align-items: center;
		justify-content: center;
	}
	h4.username {
		text-align: center;
		margin-bottom: 0;
	}
	p.role {
		text-align: center;
		margin-top: 5px;
		color: var(--color-theme-2);
	}
</style>
