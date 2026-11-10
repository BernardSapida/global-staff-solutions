import { ListBox, Select } from "@heroui/react";
import { cn } from "@/utils/cn";

export interface CompactSelectItem {
	label: string;
	value: string;
}

interface CompactSelectProps {
	/** The accessible name. There is no visible label: the control sits in a dense table row. */
	"aria-label": string;
	className?: string;
	items: CompactSelectItem[];
	onChange: (value: string) => void;
	placeholder?: string;
	/** `solid` is the navy "add" pill; `outline` is the white field. */
	tone?: "outline" | "solid";
	/** Pass `null` to keep the control showing its placeholder (an action select such as "Add team member"). */
	value: string | null;
}

/**
 * A small, non-native select: HeroUI's Select with a 36px pill trigger and a styled popover.
 * web-ui's AppSelect is a form-bound field with a visible label and no size, so it does not fit a table row.
 */
export function CompactSelect({
	"aria-label": ariaLabel,
	className,
	items,
	onChange,
	placeholder,
	tone = "outline",
	value,
}: CompactSelectProps) {
	return (
		<Select
			aria-label={ariaLabel}
			className={cn("w-full", className)}
			onChange={(key) => {
				if (key != null) onChange(String(key));
			}}
			placeholder={placeholder}
			selectionMode="single"
			value={value}
		>
			<Select.Trigger
				className={cn(
					"h-9 min-h-0 w-full gap-2 rounded-full border px-3.5 text-[13px] font-medium shadow-none",
					tone === "solid"
						? "border-[#0B2350] bg-[#0B2350] text-white hover:bg-[#1D4A9B]"
						: "border-[#D3DBE8] bg-white text-[#0B2350]",
				)}
			>
				<Select.Value className={cn("text-[13px]", tone === "solid" && "text-white")} />
				<Select.Indicator className={cn("size-3", tone === "solid" && "text-[#F5C964]")} />
			</Select.Trigger>
			<Select.Popover className="min-w-[180px]">
				<ListBox>
					{items.map((item) => (
						<ListBox.Item
							id={item.value}
							key={item.value}
							textValue={item.label}
						>
							{item.label}
							<ListBox.ItemIndicator />
						</ListBox.Item>
					))}
				</ListBox>
			</Select.Popover>
		</Select>
	);
}
