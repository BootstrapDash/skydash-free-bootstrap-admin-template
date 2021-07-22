$(function () {
	 var austDay = new Date("March  02, 20");
		$('#launch_date').countdown(
	{
	until: austDay,
	 layout: '<ul class="countdown"><li><span class="number">{dn}<\/span><span class="time">{dl}<\/span><\/li><li><span class="number">{hn}<\/span><span class="time">{hl}<\/span><\/li><li><span class="number">{mn}<\/span><span class="time">{ml}<\/span><\/li><li><span class="number">{sn}<\/span><span class="time">{sl}<\/span><\/li><\/ul>'
	  });
  		$('#year').text(austDay.getFullYear());
		
		$('#count-down').countDown({
		targetDate: {
			'day': 20,
			'month': 12,
			'year': 2028,
			'hour': 0,
			'min': 0,
			'sec': 0
		},
		omitWeeks: true
	});
});