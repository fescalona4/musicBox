from BeautifulSoup import *
import urllib
import json
import re

# Read sources to look from
data = open('sources.json').read()
# Get array of sites
sites = json.loads(data)


# Find latest song on these websites 
for site in sites:
	# Looking in each source
	song = None
	if(site['name'] == 'goku'):
		# scrape site
		html = urllib.urlopen(site['url'])
		soup = BeautifulSoup(html)
		
		# Retrieve all td
		td = soup.findAll('td')
		# First one is newest
		newTd = td[0]
		# anchor tag has the name
		a = newTd.find('a')
		# extract song name
		song = re.findall('>(.*?)<',str(a))[0]
	print 'Latest song found: ', song
	print 'Finished looking in: ', site['name']


