from BeautifulSoup import *
import urllib
import json
import re

# Read music sites to spy on
data = open('othersites.json').read()
# Get array of sites
sites = json.loads(data)


# Find latest song on these websites 
for site in sites:
	print 'Spying on: ', site['name']
	song = None
	if(site['name'] == 'cubanflow'):
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
	print 'Finished spying on: ', site['name']


