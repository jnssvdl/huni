import Image from "next/image";
import { Play } from "lucide-react";
import { Track } from "@/types/track";
import { Button } from "./ui/button";

interface TrackItemProps {
  track: Track;
}

const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        <Image
          src={track.album.cover_medium}
          alt={`${track.album.title} cover`}
          width={40}
          height={40}
        />

        <div className="min-w-0">
          <h3 className="truncate text-base font-medium">{track.title}</h3>
          <p className="text-muted-foreground truncate text-sm">
            {track.artist.name}
          </p>
        </div>
      </div>

      <Button
        className="rounded-full border p-2"
        variant={"outline"}
        size={"icon"}
        // onClick={(e) => {
        //   e.stopPropagation();
        //   e.preventDefault();
        //   console.log(track.title);
        // }}
      >
        <Play size={20} />
      </Button>
    </div>
  );
};

export default TrackItem;
