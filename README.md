# Demo

Demonstrates issue with transparent window and transparent webm video in Electron 0.36.0


`npm install && grunt exec:package_mac35 exec:package_mac36 exec:package_mac132`


- 0.35.4  - no issues
- 0.36  - ghosting on transparent
- 1.3.2 - still ghosting but different


I you curious tranparent webm can be produced with

```
brew install ffmpeg --with-libvpx --with-libvorbis --with-openssl --with-theora --with-x265 --with-fdk-aac

# alpha_source.mov is Apple ProRes 4444

ffmpeg -i alpha_source.mov -c:v libvpx -quality good -b:v 1M -qmin 10 -qmax 42 -maxrate 1M -cpu-used 0 -bufsize 2M -threads 4 -c:a vorbis -b:a 128k -strict -2 alpha.webm
```

- http://wiki.webmproject.org/alpha-channel
